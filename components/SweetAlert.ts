"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css"; // use css instead of scss

const MySwal = withReactContent(Swal);

// Default options wrapper
export const sweetAlert = (options: any) => {
  return MySwal.fire({
    confirmButtonColor: "#fb8717", 
    cancelButtonColor: "#29AB87", 
    buttonsStyling: true,
    ...options,
  });
};
