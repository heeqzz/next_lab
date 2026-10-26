import React, { useState } from 'react';
import Modal from 'react-modal';

// ВАЖНО: В Next.js корневой элемент приложения имеет id="__next"
Modal.setAppElement('#__next');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: 'white'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Затемнение фона
  }
};

export default function Content() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Страница Content (Вариант 4)</h1>
      <p>Здесь реализуется задание с использованием модального окна.</p>
      
      <button 
        onClick={openModal} 
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}
      >
        Открыть модальное окно
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Пример модального окна"
      >
        <h2 style={{ marginTop: 0 }}>Привет!</h2>
        <p>Это содержимое модального окна по варианту 4 лабораторной работы.</p>
        <form style={{ marginTop: '15px' }}>
          <input type="text" placeholder="Введите что-нибудь" style={{ padding: '5px', marginRight: '10px' }} />
          <button type="button" style={{ padding: '5px 10px' }}>Отправить</button>
        </form>
        <button 
          onClick={closeModal} 
          style={{ marginTop: '20px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Закрыть окно
        </button>
      </Modal>
    </div>
  );
}