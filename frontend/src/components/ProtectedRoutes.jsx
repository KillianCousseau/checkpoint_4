import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({
  isAllowed,
  redirectionPath = "/connexion",
  children,
}) {
  if (!isAllowed) return <Navigate to={redirectionPath} replace />;

  return children || <Outlet />;
}

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  redirectionPath: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ProtectedRoutes.defaultProps = {
  redirectionPath: "/connexion",
  children: undefined,
};
