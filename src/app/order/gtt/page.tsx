import { GttOrderPopup } from "@/components/order/gtt-order-popup";

export default function GttPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GTT Orders</h1>
      
      <GttOrderPopup />
    </div>
  );
}
