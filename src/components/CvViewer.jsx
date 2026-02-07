import { useState } from "react";
import { FileText, X } from "lucide-react";

export function CvViewer({ traineeProfile, cvUrl }) {
  const [open, setOpen] = useState(false);

  const isPdf = true 

  console.log('Cv url ...',cvUrl)

  return (
    <>
      {/* CV PREVIEW CARD */}
      <div>
        <span className="block text-gray-500 text-sm mb-3">CV:</span>

        <div
          onClick={() => setOpen(true)}
          className="
            bg-[#1A1A1A]
            border border-white/10
            rounded-lg
            p-3
            flex items-center gap-4
            w-fit pr-8
            cursor-pointer
            hover:border-[#FAB614]/60
            transition
          "
        >
          <div className="w-10 h-10 bg-red-500/20 rounded flex items-center justify-center text-red-500">
            <FileText size={20} />
          </div>

          <span className="text-white font-medium text-sm">
            {traineeProfile.personalInfo.cvFileName}
          </span>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          
          <div className="
            relative
            bg-[#0F0F0F]
            rounded-2xl
            w-full
            max-w-4xl
            max-h-[90vh]
            overflow-hidden
            border border-white/10
          ">

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="text-white font-semibold text-lg">
                CV Preview
              </h3>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-4 overflow-auto max-h-[80vh] flex justify-center">
              {isPdf ? (
                <iframe
                  src={cvUrl}
                  title="CV PDF"
                  className="w-full h-[70vh] rounded-lg bg-white"
                />
              ) : (
                <img
                  src={cvUrl}
                  alt="CV"
                  className="max-w-full max-h-[70vh] rounded-lg object-contain"
                />
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
