const Container = (props) => {
  return (
    <div className="container mx-auto max-w-screen-xl min-h-screen pt-16 pb-16">
      {props.children}
    </div>
  );
};

export default Container;
