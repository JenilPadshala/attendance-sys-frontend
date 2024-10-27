import React from "react";
import { useNavigate } from "react-router-dom";
export default function Courses(props) {
  const navigate = useNavigate();
  return (
    <tr
      onClick={(e) =>
        navigate(
          `/faculty/${props.facultyData.faculty_id}/${props.course.course_id}/attendance`,
          {
            state: {
              course: props.course,
              facultyData: props.facultyData,
            },
          }
        )
      }
    >
      <th scope="row">{props.course.course_id}</th>
      <td>{props.course.course_name}</td>
    </tr>
  );
}
