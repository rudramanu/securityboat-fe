import React, { useState } from "react";

const Sidebar = ({ handleFilter }) => {
  return (
    <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
      <ul
        class="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px"
        data-bs-theme="light"
      >
        <li>
          <a class={`dropdown-item rounded-2`} href="#">
            All
          </a>
        </li>
        <li>
          <a
            class="dropdown-item rounded-2"
            href="#"
            onClick={() => {
              handleFilter("tshirt");
            }}
          >
            Tshirt
          </a>
        </li>
        <li>
          <a
            class="dropdown-item rounded-2"
            href="#"
            onClick={() => {
              handleFilter("pen");
            }}
          >
            Pen
          </a>
        </li>
        <li>
          <a
            class="dropdown-item rounded-2"
            href="#"
            onClick={() => {
              handleFilter("book");
            }}
          >
            Book
          </a>
        </li>
        <li>
          <a
            class="dropdown-item rounded-2"
            href="#"
            onClick={() => {
              handleFilter("table");
            }}
          >
            Table
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
