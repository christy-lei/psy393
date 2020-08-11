// This is a simple demo study created for PSY393, Fall 2020
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Specify the sequence of the experiment: start with "intro" and "countdown", 
// then present all the experimental "trials" in a random order,
// then send the results and finally show the trial labeled "bye"

Sequence( "intro", "countdown", randomize("trials"), SendResults() , "bye" )
    
// Create a "intro" trial that presents your experimental instruction 
    newTrial( "intro" ,  // name the trial "intro"
        newText("In this experiment, you will see 200 word-pairs, each pair preceded by a fixation cross.")
            .print()
            .css("font-size","18px")
            .center()
            
        ,
        newText("Please use your dominant hand to respond. Adjust the position of the keyboard if necessary.")
            .print()
            .css("font-size","18px")
            .center()
        ,
        
        newText("If the two words are <b>related</b>, press F on the keyboard. If they are <b>unrelated</b>, press J on the keyboard.")
            .print()
            .css("font-size","18px")
            .center()
        ,
        newText("Try to respond <b>as fast as possible </b>while being accurate. When you are ready, press F or J to start the experiment.")
            .print()
            .css("font-size","18px")
            .center()
        ,
        
        newText("<p>The study will take you approximately 5-8 min. However, you can stop at any time simply by closing this window. </p>")
            .print()
            .css("font-size","18px")
            .center()
        ,
        
        newKey("FJ") // Specify a set of keys ("F" or "J") available for response
            .wait() // The next command won't be executed until one of the two keys is pressed
            
        ).setOption("hideProgressBar", true) // use this to hide the progress bar (optional)
        

// Create a "coundown" trial (present 3,2,1 before the real experiment)
    newTrial("countdown",
        newText("3")
            .css("font-size","40px")
            .print("center at 50%" , "center at 50%") // print the stimulus at the center of the scrren
        
        ,
        newTimer(500)  // add a timer to present the stimulus for 500ms  
            .start()
            .wait()
        ,
        
        getText("3").remove() // remove the stimulus
        ,
        
        newText("2")
            .css("font-size","40px")
            .print("center at 50%" , "center at 50%")
        
        ,
        newTimer(500)                   
            .start()
            .wait()
        ,
        
        getText("2").remove()
        
        ,
        
        newText("1")
            .css("font-size","40px")
            .print("center at 50%" , "center at 50%")
            
        ,
        
         newTimer(500)                   
            .start()
            .wait()
        ,
        
        getText("1").remove()

            ).setOption("hideProgressBar", true)
        
        

// This Template command generates as many trials as there are rows in pcifull.csv
    Template( 
        "pcifull.csv" 
        ,            // "row" will iteratively point to every row in pcifull.csv
        row => newTrial("trials", 
        
        newVar("breaks", 0).global().set(v=>v+1) // We will use this global Var element to insert a break (every 40 trials)
        .test.is(v => v%41 == 0 ) // tests the value of the Var element (insert a break at every 41th trial)
        .success(newText("break","<p>Please take a break now!</p> <p> When you are ready, press F or J to continue. </p>") 
                .css("font-size","20px")
                .print("center at 50%" , "center at 50%")
                .log()
                .center()
            ,
        newKey("FJ") // press one of the keys to resume the study
            .log()
            .wait()
            ,
            
        getText("break").remove() // remove the break instruction from the screen
        
        )
            ,
            
            newText("fix", "+") // create a fixation cross 
                .css("font-size","40px")
                .print("center at 50%" , "center at 50%")
                .log()
            ,
            
            newTimer(300)    // present the fixation cross for 300ms 
                .start()
                .wait()
            ,
            
            getText("fix")
                .remove() // remove the fixation cross 
            ,
        
            newText("word1", row.Prime)  
                .css("font-size","40px")
                .print("center at 50%" , "center at 50%")
                .log()
                ,
                
                newTimer(300)    // present the first word (prime) for 300ms
                    .start()
                    .wait()
                ,
                
            getText("word1")
                .remove()        // remove the first word
            ,
            
            newText("word2", row.Critical) // present the second word (critical word)
                .css("font-size","40px")
                .print("center at 50%" , "center at 50%")
                .log()
            ,
            
           newKey("FJ") // The next trial won't start until one of the responses is made
            .log()
            .wait()
            
            
        )
        .setOption("hideProgressBar",true)
        
        .log("Condition", row.Condition)
        .log("Prime" ,row.Prime)
        .log("Critical", row.Critical)
        // use .log() to add these three columns to the results file of these Template-based trials
    )
    
   
// create a "bye" trial to inform participants about their completion
    newTrial( "bye" ,
        newText("Thank you for your participation!")
        .print()
        ,
        newText("Please close your window to exit the study.")
        .print()
        ,
        newButton()
        .wait() // Wait for a click on a non-displayed button = wait here forever
            
    ).setOption("hideProgressBar",true) 
    
    PennController.DebugOff() // Hide the debugger when you are ready to publish your study (delete this line during your initial programming/testing phase)
