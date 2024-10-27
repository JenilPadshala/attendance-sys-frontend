import React from "react";
import { useNavigate } from "react-router-dom";
export default function AttendanceTable(props) {
  return (
    <tr>
      <th scope="row">{props.course_name}</th>
      <td>{props.percentage}</td>
    </tr>
  );
}
