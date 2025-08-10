function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>Copyright © {year} Todo App</p>
        </footer>
    );
}

export default Footer;