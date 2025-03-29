'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { db } from "../../config/firebase"
import { collection, addDoc, getDocs } from "firebase/firestore";
import { showMessage } from '@/utils/notify/Alert';

const ComponentsAuthLoginForm = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")



  const getAdmin = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  const handleSubmit = async () => {
    const admins: any = await getAdmin();
    console.log(admins)
    if(email != admins[0]?.email){
      showMessage("Invalid Email", "error")
      return
    }
    if(password != admins[0]?.password){
      showMessage("Invalid Password", "error")
      return
    }
    const token = admins[0]?.id;
    localStorage.setItem("token", JSON.stringify({token, expiresIn: Date.now() + 259200000}))
    showMessage("Logged in Successfully", "success")
    setTimeout(() => {
      push("/")
    }, 1000);

  }

  return (
    <div>
      <div className="flex flex-col gap-10 justify-center items-center  ">
        <div className="text-center">
          <p className="text-gray-400 text-lg mt-4">
            Log in with your credentials to get started
          </p>
        </div>

        <div className="bg-white input-entry p-7 outline-none flex flex-col w-[350px] rounded-sm">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full border border-gray-300 px-2 py-2 mb-2"
            type="email"
          />
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full border border-gray-300 px-2 py-2 mb-5"
            type="password"
          />

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleSubmit}
              className="w-full text-white bg-blue-500 py-2 text-center hover:bg-blue-600 transition"
            >
              LOG IN
            </button>

            <div className="flex items-center justify-center gap-4 w-full">
              <div className=" w-full border-t border-gray-300"></div>

              <div className=" w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ComponentsAuthLoginForm;
