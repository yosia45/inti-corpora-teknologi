import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { Col, Button } from "antd";

export default function LandingPage() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#FFE9B8",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 3,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <Col
        span={12}
        style={{
          backgroundColor: "white",
          top: "50%",
          left: "50%",
          width: "300px",
          height: "300px",
          margin: "-50px 0 0 -50px;",
          position: "fixed",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Welcome</h1>
          <h5>Take a Tour</h5>
          <Button style={{ backgroundColor: "#F49097" }} href="/dashboard">
            Getting Started
          </Button>
          <h5>Give me Feedback</h5>
          <Button
            href="https://github.com/yosia45/inti-corpora-teknologi"
            style={{ backgroundColor: "#F49097" }}
          >
            Check The Repo
          </Button>
        </div>
      </Col>
    </div>
  );
}
