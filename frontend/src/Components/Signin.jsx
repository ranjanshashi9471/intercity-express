import login from "../images/login.png";

export default function Signin(props) {
  return (
    <div className="">
      <div className="row mb-4 mt-5 mx-5">
        <div className="col-lg-5 me-auto"></div>
        <div className=" col-lg-4 mx-auto bg-light rounded shadow bg-opacity-25 signin_form">
          <div className="m-5">
            <main class="form-signin w-100">
              <form>
                <img
                  className="mb-4"
                  src={login}
                  alt=""
                  width="72"
                  height="57"
                />
                <h1 class="h3 mb-3 fw-normal text-center">
                  Please {props.text}
                </h1>

                <div class="form-floating">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mt-2">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating mt-2">
                  <select
                    required
                    class="form-control"
                    id="selectOptions"
                    placeholder="Choose a User Type."
                  >
                    <option value={"passenger"}>Passenger</option>
                    <option value={"agent"}>Agent</option>
                    <option value={"admin/root"}>Admin/Root</option>
                  </select>
                  <label for="selectOptions">Type of user</label>
                </div>
                <div class="form-check text-start my-3 ms-1">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="remember-me"
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Remember me
                  </label>
                </div>
                <button class="btn btn-dark w-100 py-2" type="submit">
                  {props.text}
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
