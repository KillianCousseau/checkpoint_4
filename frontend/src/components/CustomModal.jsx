import PropTypes from "prop-types";

function CustomModal({ msg, closeModal }) {
  return (
    <>
      <button
        type="button"
        aria-label="closeModal"
        className="fixed inset-0 z-30"
        onClick={closeModal}
      />
      <div className="bg-umber min-w-[20rem] w-fit font-semibold font-mono text-xanthous fixed z-30 top-1/3 left-[55%] -translate-y-1/2 -translate-x-1/2 p-10 rounded-lg border-2 border-cactus">
        <p className="text-center">{msg}</p>
        <button
          type="button"
          className="text-umber absolute top-1 right-1 bg-xanthous rounded-sm px-2"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </>
  );
}

export default CustomModal;

CustomModal.propTypes = {
  msg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
