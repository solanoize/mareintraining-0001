import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";

export default function SharedBreadcrumb() {
  const location = useLocation();
  const params = useParams();

  const paramValues = Object.values(params);

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && !paramValues.includes(x)); // hapus semua segmen param

  return (
    <Breadcrumb className="mb-0 py-0">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Home
      </Breadcrumb.Item>

      {pathnames.map((segment, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        // Ubah jadi kapital huruf pertama aja
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);

        return isLast ? (
          <Breadcrumb.Item active key={to}>
            {label}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to }} key={to}>
            {label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
