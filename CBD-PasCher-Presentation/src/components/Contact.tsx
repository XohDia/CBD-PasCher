const Contact = () => (
  <section id="contact" style={{ padding: 40, textAlign: 'center' }}>
    <h2>Contactez-nous</h2>
    <form style={{ maxWidth: 400, margin: 'auto', display: 'flex', flexDirection: 'column' }}>
      <input placeholder="Nom" required style={{ margin: '10px 0', padding: 10 }} />
      <input type="email" placeholder="Email" required style={{ margin: '10px 0', padding: 10 }} />
      <textarea placeholder="Message" rows={4} required style={{ margin: '10px 0', padding: 10 }} />
      <button type="submit" style={{
        padding: 10, backgroundColor: '#2E7D32', color: '#fff', border: 'none', borderRadius: 5,
        cursor: 'pointer'
      }}>Envoyer</button>
    </form>
  </section>
);

export default Contact;