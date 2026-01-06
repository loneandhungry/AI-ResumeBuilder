import express from "express";
import { passwordSchema, schema } from "./zod.js";
import { personLogin, person } from "./mongoose.js"; 
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({path: "../.env.local"});
import cors from "cors"
import OpenAI from "openai";
import fetch from "node-fetch";


import { generateBcrypt, verify } from "./control.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { httpUrl } from "zod";


const route = express.Router();

route.get("/",(req,res)=>{
    res.send("workingg");
})

route.use(cors({
    origin: `${process.dotenv.FRONTEND_URL}`,
    credentials: true,
}))


route.post("/build",verify,async(req,res)=>{
 const data = req.body;
 console.log(data);
    try {
        const user = new person({username: req.user.username,userID: req.user.userID, ...data}); // three dots : SPREAD OPERATOR
    await user.save();     //Remember to await saving user data.
      res.json({ msg : "Your details have been saved successfully!!"});
      console.log("Resume details saved!!");

} catch(err){
 console.log(err);   //Variable name is err not error.message
 res.json("Error in saving your details.");
}
})

route.post("/signup",async(req,res)=>{
    const parsed = passwordSchema.safeParse(req.body); //safeParse is synchronous. No need for "await".
    if(!parsed.success){
        console.log(`${parsed.error.errors}`);
       // alert("The username should have atleast 4 characters and the password should have atleast 6 !");
        return res.json({
            msg : `The username should have atleast 4 characters and the password should have atleast 6 !`
        })
    }
    const password = req.body.password;
    const username = req.body.username;
    const existingUser = await personLogin.findOne({username: username}); //dont just write "username" here.
    //  U need to put in an object, not a string.
    if(existingUser){
        return res.json({
            msg: "This usename already exists!!"});
    }
    try{
        const hashedpswd = await generateBcrypt(password); // this returns a promise
      ;
        const user = new personLogin({
            username: username,
            password: hashedpswd
        });
        
        await user.save();
        res.send({
            msg : "Your username and password is saved."
        })
        console.log("Username and password saved!");
        alert("Thank you for signing up!"); //
    } catch{
       res.json({
        msg : "Not able to save the password and username(parsing done)."
       })
       console.log(err);
    }
})



route.post("/signin",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const login = await personLogin.findOne({username: username});
    if(!login){
         res.status(401).json({
            msg : "This username does not exist. Sign up first!"
        })
    }
    try{
    const check = bcrypt.compareSync(password, login.password);
 
    if(check){
      console.log("Login done!");
      const userID = login._id;
    
      if(!check){
       return res.send("Wrong Password. Please try again.")
      }
      const token = jwt.sign({username : username, userID : userID}, process.env.JWTSECRET, {expiresIn : "2d"});  ///creating token
      
      //cookie
      
      res.cookie("authToken",token,{  //name,value
        httpOnly: true,  //	Flags the cookie to be accessible only by the web server.
       // secure: false,  //marks the cookie to be used with https only
        sameSite: "strict", //Value of the “SameSite” Set-Cookie attribute
        maxAge: 2*24*60*60*1000
      })
      
       return res.json({msg : "Successful Login!"})
    } else {
        return res.json({msg : "Wrong password. Please contact the developer."})
    }



} catch(err){
    res.json("Not able to signin!");
    console.log(err);
}
})


route.get("/resume/all",verify, async(req,res)=>{
    const userID = req.user.userID;
 
    try{
    const resume = await person.find({userID : userID});  ///dont forget to await here
    res.json(resume);
    } catch(err){
        console.log(err);
        return res.send("Not able to fetch your resumes");
    }
})


route.get("/resume/:id", verify, async(req,res)=>{
    const resumeID = req.params.id;
    try{
       
    const resume = await person.find({_id: resumeID});
    if(resume.userID === req.user.userID){    
     console.log("Matched!")
     res.json(resume);
    
    }
    else{
        return res.json({
           msg:  "Please do not try to open someone else's resume."   //DONT TRY OPENING SOMEONE ELSE'S RESUME
        })
    }
    } catch(err){
        console.log(err);
        return res.send("Cannot find this resumeID.Please put in the correct one.");
    }
})

route.put("/resume/edit/:id", verify, async(req,res)=>{
    const resumeID = req.params.id;
    const edit = req.body;

    const search = await person.findById(resumeID);
    if(!search){return res.send("This resumeID does not exist.")}

   if ("userID" in edit) {                //IMPORTANT //check whether the user is trying to change the userID 
    return res.status(400).send("You are not allowed to change userID.");
}
    delete edit.userID;
       
    try{
    if(search.userID.toString() === req.user.userID.toString()){  
         
     console.log("Matched!")
     const success = await person.findByIdAndUpdate(resumeID, edit, { new: true });
      res.json({
        msg : "Your resume has been updated."
     })
     if(!success){
        return res.send("Resume not found");
     }
    }else{
        return res.send("Don't try to access other people's resume please.")
    }
   }catch(err){
    console.log(err);
      return res.send("Cannot find your resume.")
    }
})

route.delete("/resume/delete/:id",verify,async (req,res)=>{
    const resumeID = req.params.id;
    let resume;
    try{
     resume = await person.findById(resumeID);
    } catch(err){
        return res.send("Incorrect resumeID");
    }
    if(!resume){
        return res.send("This resumeID does not exist.");
    }
    if(req.user.userID !== resume.userID.toString() ){
        return res.send("Please do not try to access other people's resumes.")
    }
    try{
        const success = await person.findByIdAndDelete(resumeID);
        if(success){
        return res.send("This resume has been deleted.");
        }
        else{
            res.send("Not able to delete this resume")
        }
    } catch(err){
        console.log(err);
        return res.send("Not able to delete this resume")
    }
})



route.delete("/user/delete/:id", verify , async(req,res)=>{
    const userID = req.params.id;
    if(req.user.userID !== userID ){
        return res.send("Please do not try to access other people's accounts.")
    }
    let user;
    try{
     user = await personLogin.findByIdAndDelete(userID);
    } catch(err){
        return res.send("Incorrect userID");
    }
     if(!user){
        return res.send("This userID does not exist.");
    }
    
    try {
        await person.deleteMany({userID : userID});      //deleteMany
        res.clearCookie("authToken" , {
        httpOnly: true,  //	Flags the cookie to be accessible only by the web server.
        secure: true,  //marks the cookie to be used with https only
        sameSite: "none", //Value of the “SameSite” Set-Cookie attribute
        maxAge: 2*24*60*60*1000
        })
        res.send("Your acconut has been completely deleted successfully!!")
    } catch(err){
        console.log(err);
        return res.status(500).send("Not able to delete your account.");
    }
})

route.post("/signout",verify,(req,res)=>{
        res.clearCookie("authToken",{
         httpOnly: true,  //	Flags the cookie to be accessible only by the web server.
       // secure: false,  //marks the cookie to be used with https only
        sameSite: "strict", //Value of the “SameSite” Set-Cookie attribute
        maxAge: 2*24*60*60*1000
    })
     return res.json({ msg : "You have successfullly signed out."})
    })
   
route.get("/profile", verify, async (req,res) =>{
      const find = await personLogin.findById(req.user.userID);
      if(!find){
        return res.send("User does not exist.");
      }
      try{
        res.json({
            profile : find.profile,
            username: find.username
        })
        console.log(find);
      } catch(err){
        console.log(err);
        return res.send("Error fetching the file")
      }
    })


   
    route.post("/ai/project" , async (req,res) => {
    const description =  req.body.description;
    const title = req.body.title;
    const techstack= req.body.techstack;
    if(!description) return;
    
  
 const  prompt = `You are a professional resume writer.

TASK:
Convert the project details into EXACTLY 3 resume bullet points.

STRICT RULES:
- Output EXACTLY 3 bullet points (no more, no less)
- Each bullet must be ONE single complete sentence
- Each bullet must be a complete sentence UNDER 25 words
- Do not continue one sentence to the next bullet (ONE BULLET = ONE COMPLETE SENTENCE)
- Use strong action verbs
- Use third-person, past tense
- Do NOT use first-person
- Do NOT add explanations, headings, or blank lines
- Do NOT wrap text across multiple lines
- Focus on impact, scale, and technologies


    Project Title:'${title}'
    Tech Stack: '${techstack}'

    Description:
    ${description}

    Return ONLY bullet points as a list.`




   const data =({
    messages: [
        {
            role: "system",
            content: `${prompt}`,
        },
    ],
    model: "openai/gpt-oss-20b:groq"
})
try{
const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			headers: {
				Authorization:`Bearer ${process.env.HUGGING_FACE_API}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
   
    res.send(result.choices[0].message.content)
} catch(err){
    console.log(err);
}

});



   
    route.post("/ai/experience" , async (req,res) => {
    const company =  req.body.company;
    const role = req.body.role;
    const description= req.body.description;
    const duration= req.body.duration;
    if(!description) return;
  
 const  prompt = `You are a professional resume writer.

TASK:
Convert the project details into EXACTLY 3 resume bullet points.

STRICT RULES:
- Output EXACTLY 3 bullet points (no more, no less)
- Each bullet must be ONE single complete sentence
- Each bullet must be a complete sentence UNDER 25 words
- Do not continue one sentence to the next bullet (ONE BULLET = ONE COMPLETE SENTENCE)
- Use strong action verbs
- Use third-person, past tense
- Do NOT use first-person
- Do NOT add explanations, headings, or blank lines
- Do NOT wrap text across multiple lines
- Focus on impact, scale, and technologies


   Company : ${company}
   Role : ${role}
   Duration : ${duration}
    Description:
    ${description}

    Return ONLY bullet points as a list.`




   const data =({
    messages: [
        {
            role: "system",
            content: `${prompt}`,
        },
    ],
    model: "openai/gpt-oss-20b:groq"
})
try{
const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			headers: {
				Authorization:`Bearer ${process.env.HUGGING_FACE_API}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
   
    res.send(result.choices[0].message.content)
}catch(err){
    console.log(err);
}

 
});

route.post("/resumeUpdate/:resumeID" , verify, async(req,res) =>{
    const userID = req.user;
    const resumeID = req.params.resumeID;
    const profile = req.body;
    try{
    const find = await person.findByIdAndUpdate(resumeID,  
         profile   
      , { new: true });
     res.json({
        msg: "Resume Updated",
        profile: profile
     }) 
    if(!find){
        return res.send("Cannot find the UserID");
    }
}catch(err){
    console.log(err);
}
})

route.delete("/resumeDelete/:resumeID" , verify, async(req,res) =>{
    const userID = req.user;
    const resumeID = req.params.resumeID;
    try{
    const find = await person.findByIdAndDelete(resumeID  );
     res.json({
        msg: "Resume Deleted"
     }) 
    if(!find){
        return res.send("Cannot delete the resume");
    }
}catch(err){
    console.log(err);
}
})

route.get("/isauth" ,  verify, async(req,res) =>{
    res.send("checking auth");
})
 

export default route;