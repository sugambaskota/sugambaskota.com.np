import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import useTheme from "hooks/useTheme";

export default function Tparticles() {
  const [theme] = useTheme();

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      init={particlesInit}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}
      options={{
        fullScreen: {
          enable: false,
        },
        particles: {
          color: {
            value: theme === "dark" ? "#a3a3a3" : "#525252",
          },
          number: {
            value: 170,
            density: {
              enable: false,
            },
          },
          size: {
            value: 2,
            random: true,
            anim: {
              speed: 4,
              size_min: 0.3,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            random: true,
            speed: 0.5,
            direction: "top",
            out_mode: "out",
            enable: true,
          },
        },
        interactivity: {
          modes: {
            bubble: {
              distance: 250,
              duration: 2,
              size: 0,
              opacity: 0,
            },
            repulse: {
              distance: 400,
              duration: 4,
            },
          },
        },
      }}
    />
  );
}
