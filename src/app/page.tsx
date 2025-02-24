'use client';
import { Checkbox } from "@/components";
import { Button } from "@/components/Button";
import { useState } from "react";




export default function Home() {


const [checked, setChecked] = useState("");

  return (
    <div className="min-h-screen">
       <div className="flex justify-center items-center mt-[100px]">
      <h1 className="text-[60px] font-extrabold" style={{ fontFamily: "Arial" }}>
        Join as a client or talent
      </h1></div>
     <div className="flex justify-center items-center mt-[91px] gap-[25px]">

      <label htmlFor="client"  className="border-2 max-w-[477px] min-h-[277px]  border-primary-900 rounded-xl p-8 flex flex-col gap-9">
        <div className="flex items-center justify-between">
          <span role="img" className="text-[45px]" aria-label="rocket"> 🚀</span>
         <Checkbox  checked={checked==="client"} id="client" name="role" value="client" checkboxSize={"xl"} onChange={(e) => setChecked(e.target.value)}/>
        </div>
        <h2 className="text-[32px] leading-[38px] font-medium">I’m a client, hiring for a project</h2>
      </label>
        <label htmlFor="talent" className="border-2 max-w-[475px] min-h-[277px]   border-primary-900 rounded-xl p-8 flex flex-col gap-9">
        <div className="flex items-center justify-between">
          <span role="img" className="text-[45px]" aria-label="male technologist"> 👨‍💻</span>
          
         <Checkbox id="talent" name="role" checked={checked==="talent"} value="talent" checkboxSize={"xl"} onChange={(e) => setChecked(e.target.value)}/>
        </div>
        <h2 className="text-[32px] leading-[38px] font-medium">I’m talent, looking for the projects</h2>
      </label>

      
      </div>
<div className="flex justify-center items-center mt-[66px]">
     <Button variant={"black"} size={"xxl"}>{checked?checked==="talent"?"Join as  Talent":"Join as a Client":"Create Account"}</Button>
</div>

       <div className="text-center mt-[66px]">
   <div className="relative inline-block">
    Already have an account? 
            <span className="text-xl font-bold tracking-tight text-black mb-0.5">
         Login
            {checked&&<div
              className="absolute bottom-0 left-0 h-1.5 w-full"
              style={{
                background: "linear-gradient(90deg, #FFB636, #FF4E9D, #4CB1FF)",
              }}
            ></div>}
            </span>
            
        </div>   

    </div>
    </div>
  );
}
