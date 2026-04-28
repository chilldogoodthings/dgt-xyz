import Image from "next/image";
import { SITESETTINGS_QUERY_RESULT } from "@/sanity/sanity.types";

type HeaderIconType = NonNullable<SITESETTINGS_QUERY_RESULT>["headerIcon"];

interface HeaderProps {
  title: string;
  icon?: HeaderIconType;
  //icon: { asset: { url: string }; alt?: string };
}

const Header = ({ title, icon }: HeaderProps) => {
  return (
    <header style={{ display: "flex", alignItems: "center", padding: "1rem" }}>
      {icon && (
        <Image
          src={icon.asset?.url || ""}
          alt={icon.alt || "Logo"}
          width={50}
          height={50}
        />
      )}
      <span
        style={{ marginLeft: "1rem", fontSize: "1rem", fontWeight: "bold" }}
      >
        {title}
      </span>
    </header>
  );
};

export default Header;
