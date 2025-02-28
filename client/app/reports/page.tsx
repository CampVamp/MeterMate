import Image from "next/image";

const Reports = () => {
  return (
    <div className="text-[#121212] w-full h-full flex flex-col gap-6 items-center justify-center py-8">
      <Image
        src="/construction.svg"
        alt="Construction"
        width={400}
        height={400}
      />
      <div className="text-[#121212] text-3xl font-bold">
        Hang tight! We&apos;re making this page better.
      </div>
    </div>
  );
};

export default Reports;
