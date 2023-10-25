import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook -> it is used when we want to take reference of something, in this project we will use this hook to copy the password using "copy" button and copy it to clipboard

  const passwordRef = useRef(null);

  //useCallback hook takes a function and a dependency array
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let nums = "0123456789";
    let chars = "{}[]()<>@#$%&*!?";

    if (numberAllowed) str += nums;
    if (characterAllowed) str += chars;

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);
    //the below dependency array is chosen: if any changes are done to the length then keep in cache, or any change in numberAllowed falg or characterallowed flag or.... if any changes are made to the setPassword function......we have not passed "password" as the dependency because then the program will go in an infinite lopp becuase password value will always change and hence things will keep on changing
  }, [length, numberAllowed, characterAllowed, setPassword]);

  //we are using usecallback hook to optimize the code, and since it is related to password we are passing password as the dependency
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); //this will highlight the copied text
    window.navigator.clipboard.writeText(password); // this will do the job but doesnt look appealing
  }, [password]);

  //use effect also has a callback and a dependency array same as useCallback Hook
  // we used useEffect hook, so that the password generator function could be run
  // directly writing the function passwordGenerator() will throw an error because react does not allow manual intervention to change the renders, so we use useEffect hook so that passwrodGenerator function can be called

  //useeffect isliye agar koi bhi ched chaad ho in dependencies m ....toh run kardo function phirse
  //useCallback isliye ki agar koi bhi change ho dependencies m toh optimize kardo video timestamp: 4:56:00 (https://www.youtube.com/watch?v=FxgM9k1rg0Q&list=LL&index=2&t=15247s)

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gray-700">
        <h2>Pasword Generator</h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            //the below is used for useRef hook
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-gray-400 text-white px-3 py-0.5 shrink-0 copy-button"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1"></div>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={characterAllowed}
            id="characterInput"
            onChange={() => {
              setCharacterAllowed((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
