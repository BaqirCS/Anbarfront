function InfoMessage({ color, message }) {
  return (
    <>
      <small className="" style={{ color }}>
        <b>{message}</b>
      </small>
      ;
    </>
  );
}

export default InfoMessage;
