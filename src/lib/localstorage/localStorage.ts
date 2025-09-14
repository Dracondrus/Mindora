export const checkStorage = () => {
  const data = localStorage.getItem("user_tests");


  if (!data) {
    localStorage.setItem("user_tests", JSON.stringify([]));
  } 
};


