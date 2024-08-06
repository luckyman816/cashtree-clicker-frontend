export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-[90vw] h-4 bg-[#2F2F2F] rounded-full flex items-center"
      >
        <div
          className="bg-gradient-to-r from-[#06E1F4] to-[#A07FF1] h-[14px] rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  )
}
