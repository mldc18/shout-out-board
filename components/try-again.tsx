const TryAgain = () => {
  return (
    <div>
      <div className="text-4xl sm:text-8xl tracking-tight font-Rubik">
        try again...
      </div>
      <ul className="text-2xl sm:text-3xl tracking-tight font-Rubik font-light mt-8 list-disc ml-8">
        acceptable names have
        <li className="ml-10 mt-4">3-12 letters</li>
        <li className="ml-10 mt-2">spaces</li>
        <li className="ml-10 mt-2">no numbers</li>
      </ul>
    </div>
  );
};

export default TryAgain;
