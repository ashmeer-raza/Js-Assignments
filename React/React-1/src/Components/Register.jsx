import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  console.log(user);

  let handleSubmit = () => {};
  const hanleChanges = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <input
        type="text"
        value={user.name}
        name="name"
        onChange={hanleChanges}
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={hanleChanges}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
    // <div className="flex flex-col gap-4 items-center justify-center">
    //   <form className="flex flex-col items-center justify-center gap-4">
    //     <input
    //       onChange={(e) => {
    //         setUsers({
    //           name: e.target.value,
    //         });
    //       }}
    //       className="border border-amber-200 rounded-2xl p-2"
    //       type="text"
    //       placeholder="Enter Name"
    //     />

    //     <input
    //       className="border border-amber-200 rounded-2xl p-2"
    //       type="email"
    //       placeholder="Enter Email"
    //     />

    //     <input
    //       className="border border-amber-200 rounded-2xl p-2"
    //       type="password"
    //       placeholder="Enter Password"
    //     />

    //     <button className="bg-blue-900 w-full border-amber-50 rounded-xl p-2">
    //       Register
    //     </button>
    //   </form>

    //   <h2>Already Register? Login Here</h2>
    // </div>
  );
};

export default Register;
