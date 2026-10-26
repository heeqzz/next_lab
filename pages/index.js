import React from 'react';
import Head from 'next/head';
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";

const buttonStyle = {
  padding: "15px",
  borderRadius: "50%",
  background: "red",
  opacity: 0.7,
  fontSize: "20px",
  border: "none",
  cursor: "pointer"
};

const headerStyle = {
  color: 'white',
  position: "absolute",
  zIndex: 4,
  top: '30%',
  left: '40%',
  textShadow: "2px 2px 4px #000000"
};

const contentStyle = {
  color: 'white',
  textAlign: "center",
  top: '50%',
  left: '25%',
  position: "absolute",
  zIndex: 4,
  textShadow: "2px 2px 4px #000000"
};

const bgImg = {
  position: "fixed",
  zIndex: 3,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

function sendEmail(email) {
  const user = localStorage.getItem('user') || 'Неизвестный';
  const body = `Здравствуйте, я нашел вашего питомца.%0A-----------%0AС уважением, ${user}`;
  window.open(`mailto:${email}?subject=Потерянный зверь&body=${body}`);
}

function Animal(props) {
  if (!props.data) return <p>Загрузка...</p>;
  const { header, content, img } = props.data;
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <h1 style={headerStyle}>{header}</h1>
      <h2 style={contentStyle}>{content}</h2>
      <img style={bgImg} alt="Животное" src={img} />
    </div>
  );
}

export default function Home() {
  const [animals, setAnimals] = React.useState([]);

  React.useEffect(() => {
    fetch('/animals.json')
      .then(data => data.json())
      .then(data => setAnimals(data));
  }, []);

  React.useEffect(() => {
  let user = localStorage.getItem('user');
  if (user === null) {
    user = prompt("Введите ваше имя пользователя");
    if (user && user.trim() !== "") {
      localStorage.setItem('user', user);
    } else {
      localStorage.setItem('user', 'Гость');
    }
  }
}, []);

  function logout() {
    localStorage.clear();
    location.reload();
  }

  return (
    <div>
      <Head>
        <title>Petto - Поиск животных</title>
      </Head>
      
      <main>
        <button onClick={logout} style={{ ...buttonStyle, position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
          Выйти
        </button>
        
        {/* Ссылка на страницу статистики для администрации */}
        <a href="/statistics" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, color: 'white', fontSize: '18px', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '5px', textDecoration: 'none' }}>
          📊 Статистика (Админ)
        </a>

        <AwesomeSlider style={{ "--slider-height-percentage": "100%" }}>
          {animals.map((data, i) => (
            <div key={i} style={{ zIndex: 2 }} onClick={() => sendEmail(data?.email)}>
              <Animal data={data} />
            </div>
          ))}
        </AwesomeSlider>
      </main>
      
      <footer style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center', color: 'white', zIndex: 10, textShadow: "1px 1px 2px black" }}>
        Petto, (c) 2024
      </footer>
    </div>
  );
}