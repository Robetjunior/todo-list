import styles from './Header.module.css'

import igniteLogo from '../assets/rocket.png'
import nameLogo from '../assets/todo.png'

export function Header(){
    return (
        <header className={styles.header}>
            <img src={igniteLogo} alt="logotipo do Ignite" />
            <img src={nameLogo} alt="nome do Desafio" />
        </header>
    );
}