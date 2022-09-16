import styles from './csssrc/app.module.css';
import NavbarW from './components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer  from './components/Footer';
function App() {
  return (
    <div className={styles.a}>
      <NavbarW/>
      <Footer/>
    </div>
  );
}

export default App;
