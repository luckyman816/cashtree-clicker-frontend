import { ToastContainer } from "react-toastify";
import Footer from "../component/Footer";
export default function Wallet() {

  return (
    <div className="flex flex-col justify-between items-center h-full w-full">
      <ToastContainer />

      <Footer />
    </div>
  );
}
