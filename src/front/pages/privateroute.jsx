
import { Navigate, Outlet } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const PrivateRoutes = () => {
  const { store} = useGlobalReducer()
    const checkToken=()=>{
    const arryToken= store.token.split('.')
    const verify=JSON.parse(atob(arryToken[1]))
    if ( Number(verify.sub)===store.todos[0].id) return true
    else return false
  }
  const valid=checkToken()
  return (valid ? <Outlet/> : <Navigate to="/" />
  );
 

}