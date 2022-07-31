import * as React from "react";

import useTheme from "hooks/useTheme";

export default function Ham({ isHamOpen, toggleMenu }: any) {
  const [theme] = useTheme();

  return (
    <React.Fragment>
      <div className="menu cross">
        <label>
          <input type="checkbox" checked={isHamOpen} onChange={toggleMenu} />
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              stroke: theme === "dark" ? "#fff" : "#000",
            }}
          >
            <path className="line_1" d="M0 40h62c13 0 6 28-4 18L35 35" />
            <path className="line_2" d="M0 50h70" />
            <path className="line_3" d="M0 60h62c13 0 6-28-4-18L35 65" />
          </svg>
        </label>
      </div>
      <style jsx>
        {`
          input {
            display: none;
          }

          label {
            display: block;
            cursor: pointer;
            width: 3.5rem;
            height: 3.5rem;
          }

          path {
            fill: none;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
            --length: 24;
            --offset: -38;
            stroke-dasharray: var(--length) var(--total-length);
            stroke-dashoffset: var(--offset);
            transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
          }

          .cross input:checked + svg .line_1,
          .cross input:checked + svg .line_3 {
            --length: 22.627416998;
          }

          .cross input:checked + svg .line_2 {
            --length: 0;
          }

          .back input:checked + svg .line_1,
          .back input:checked + svg .line_3 {
            --length: 8.602325267;
          }

          .menu- {
            background-color: #3f77e9;
          }

          .menu .line_1,
          .menu .line_3 {
            --total-length: 126.64183044433594;
          }

          .menu .line_2 {
            --total-length: 70;
          }

          .menu input:checked + svg .line_1,
          .menu input:checked + svg .line_3 {
            --offset: -94.1149185097;
          }

          .menu input:checked + svg .line_2 {
            --offset: -50;
          }
        `}
      </style>
    </React.Fragment>
  );
}
