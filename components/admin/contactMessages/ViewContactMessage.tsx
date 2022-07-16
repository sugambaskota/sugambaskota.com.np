import { Modal } from "antd";

const Item = ({ title, content }: any) => {
  return (
    <div className="space-y-1">
      {title && <div className="text-xl font-semibold">{title}:</div>}
      {content && <div className="text-lg">{content}</div>}
    </div>
  );
};

export default function ViewContactMessage({
  visible,
  hideModal,
  activeContactMessage,
}: any) {
  return (
    <Modal visible={visible} onCancel={hideModal} footer={null}>
      <div>
        <h2 className="text-2xl font-semibold">View Message</h2>
        <div className="mt-2 h-px bg-neutral-200" />
      </div>
      <div className="mt-4 space-y-3">
        <Item title="Full Name" content={activeContactMessage?.name} />
        <Item title="Email" content={activeContactMessage?.email} />
        <Item
          title="Contact Number"
          content={activeContactMessage?.contactNumber}
        />
        <Item title="Address" content={activeContactMessage?.address} />
        <Item title="Message" content={activeContactMessage?.message} />
      </div>
    </Modal>
  );
}
