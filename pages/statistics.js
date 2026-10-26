import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Statistics() {
  const [stats, setStats] = useState({ ads: 0, shops: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch('/statistics.json')
    .then(res => {
      console.log("Status:", res.status);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.text(); // Сначала получаем как текст
    })
    .then(text => {
      console.log("Raw response:", text);
      const data = JSON.parse(text); // Затем парсим
      setStats(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Ошибка:", err);
      setStats({ ads: 0, shops: 0, users: 0 });
      setLoading(false);
    });
}, []);

  if (loading) {
    return <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>Загрузка статистики...</div>;
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <Head>
        <title>Статистика - Администрация Petto</title>
      </Head>
      
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>📊 Статистика сайта (Панель администрации)</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        {/* Карточка объявлений */}
        <div style={{ border: '1px solid #ddd', padding: '30px', borderRadius: '12px', width: '200px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#555' }}>Объявления</h3>
          <p style={{ fontSize: '48px', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>{stats.ads}</p>
        </div>

        {/* Карточка зоомагазинов */}
        <div style={{ border: '1px solid #ddd', padding: '30px', borderRadius: '12px', width: '200px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#555' }}>Зоомагазины</h3>
          <p style={{ fontSize: '48px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>{stats.shops}</p>
        </div>

        {/* Карточка пользователей */}
        <div style={{ border: '1px solid #ddd', padding: '30px', borderRadius: '12px', width: '200px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#555' }}>Пользователи</h3>
          <p style={{ fontSize: '48px', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }}>{stats.users}</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <a href="/" style={{ textDecoration: 'none', color: '#3b82f6', fontSize: '18px', fontWeight: 'bold' }}>
          ← Вернуться на главную страницу
        </a>
      </div>
    </div>
  );
}