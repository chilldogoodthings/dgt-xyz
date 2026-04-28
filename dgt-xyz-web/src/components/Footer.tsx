interface FooterProps {
  text: string;
}

const Footer = ({ text }: FooterProps) => {
  return (
    <footer style={{ padding: "1rem", textAlign: "center" }}>{text}</footer>
  );
};

export default Footer;
