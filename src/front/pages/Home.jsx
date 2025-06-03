
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { users } from "../fecht_user.js";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";




export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const history = useNavigate();
  const handleNavigate = () => history("/demo");
  const handleNavigatelogin = () => history("/");
  const handleCreatuser = async () => {
    try {
      const data = await users.createuser(store.email, store.password);

      if ((typeof data.token === "string" && data.token.length > 0)) {
        await dispatch({ type: "addToken", value: data.token });
        await dispatch({ type: "add_user", value: data.user });
        handleNavigate() }
      if ((data.msg)) {
        swal({
          title: "NUEVO USUARIO CREADO",
          text: `${data.msg}`,
          icon: "success",
          buttons: true,
        });
        handleNavigate()
      } else if (data.msg === "El mail o la contraseña es incorrecto") {
        swal({
          title: "ERROR",
          text: `${data.error}`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
      else {
        swal({
          title: "ERROR",
          text: `${data.error}`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
      console.log(data);
    } catch (error) {

    }
  };

  const handleLogingUser = async () => {
    try {
      const data = await users.loginguser(store.email, store.password);
      console.log(data);
      if ((typeof data.token === "string" && data.token.length > 0)) {
        await dispatch({ type: "addToken", value: data.token });
        await dispatch({ type: "add_user", value: data.user });
        handleNavigate()
      } else if (data.msg === "El mail o la contraseña es incorrecto") {
        swal({
          title: "ERROR",
          text: `${data.error}`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
      else {
        swal({
          title: "ERROR",
          text: `${data.msg}`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
      return data;
    } catch (error) { }
  };

  const handleprivate = async () => {
    console.log('store', store)
    try {
      const data = await users.privateareauser(store.token);
      if (data.confirmation) {
        dispatch({ type: "add_user", value: data.user });

        swal({
          title: "Ya estás en tu area PRIVADA",
          text: `${data.user.email}`,
          icon: "success",
          buttons: true,
          dangerMode: true,
        });
      } else {
        swal({
          title: "ERROR",
          text: `${data.msg}`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
    } catch (error) { }
  };

  const createContact = async () => {
    if (store.email !== "" && store.password !== "") {
      await handleCreatuser();
    }
  };
  const logingUser = async () => {
    if (store.email !== "" && store.password !== "") {
      const dataLogin = await handleLogingUser();




      // if (dataLogin.validToken) {
      //    await handleprivate();
      //  }
    }

  };

  console.log(store.todos)
  return (
    <div className="text-center mt-5">
      <div style={{ display: `${store.login}`}}>
        <h1 className="title">Wellcome to login</h1>
        <div className="log mt-5">
          <label className="form-label">Enter Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Email"
            value={store.email}
            onChange={(e) =>
              dispatch({ type: "addEmail", value: e.target.value })
            }
          />
          <label className="form-label">Enter Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Password"
            value={store.password}
            onChange={(e) =>
              dispatch({ type: "addPassword", value: e.target.value })
            }
          />
          <button
            type="button"
            id="formButton"
            className="btn btn-primary mt-5"
             onClick={() => {
               dispatch({
                      type: "login",
                      value: "none",
                    })
                    dispatch({
                      type: "register",
                      value: "",
                    })
                  }}>
            Go to Register
          </button>
          <button
            type="button"
            id="formButton"
            className="btn btn-primary mt-5"
            onClick={logingUser}
          >
            Login
          </button>
        </div>
      </div>

      <div className="register" style={{ display: `${store.register}`}}>
        <h1 className="title">Wellcome to register</h1>
        <div className="log mt-5">
          <label className="form-label">Enter Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Email"
            value={store.email}
            onChange={(e) =>
              dispatch({ type: "addEmail", value: e.target.value })
            }
          />
          <label className="form-label">Enter Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Password"
            value={store.password}
            onChange={(e) =>
              dispatch({ type: "addPassword", value: e.target.value })
            }
          />
          <button
            type="button"
            id="formButton"
            className="btn btn-primary mt-5"
            onClick={createContact}
          >
            Register
          </button>
          <button
            type="button"
            id="formButton"
            className="btn btn-primary mt-5"
           onClick={() => {
               dispatch({
                      type: "login",
                      value: "",
                    })
                    dispatch({
                      type: "register",
                      value: "none",
                    })
                  }}>
            Back to Login
          </button>
        </div>
      </div>
    </div>

  );
};
