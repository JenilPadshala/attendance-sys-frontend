export default function StudentNavbar(props) {
  function handleClick() {
    localStorage.removeItem("student");
    window.location.href = "/";
  }
  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand">
          {props.studentData.first_name} {props.studentData.last_name} |{" "}
          {props.studentData.email}
        </a>
        <button className="btn btn-danger ms-auto" onClick={handleClick}>
          Logout
        </button>
      </div>
    </nav>
  );
}
