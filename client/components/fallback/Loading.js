import LOADING from "../../../public/loading.gif";

export default function Loading() {
  return (
    <div className="mt-5 p-5 text-center">
      <img className="mt-5 p-5" src={LOADING} alt="loading..." />
    </div>
  );
}
