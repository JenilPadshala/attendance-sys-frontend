export default function FacultyNavbar(props) {
  function handleClick() {
    localStorage.removeItem("faculty");
    window.location.href = "/";
  }
  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand">
          {props.facultyData.first_name} {props.facultyData.last_name} |{" "}
          {props.facultyData.email}
        </a>
        <button className="btn btn-danger ms-auto" onClick={handleClick}>
          Logout
        </button>
      </div>
    </nav>
  );
}
