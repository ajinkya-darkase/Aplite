interface PaymentInstructionsSectionProps {
  text?: string | any; // allow unexpected values from backend
}

export default function PaymentInstructionsSection({
  text,
}: PaymentInstructionsSectionProps) {
  // Normalize to always be a string
  const safeText = typeof text === "string" ? text : "";

  return (
    <div className="p-6 relative min-h-[600px]">
      <h2 className="text-lg text-gray-900 mb-6">Payment Instructions</h2>
      <p className="text-gray-600 mb-6">
        Payment instructions show how to send payments to this business
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-gray-800 mb-3">Payment Instructions</h3>

          <div className="text-sm text-gray-600 leading-relaxed">
            {safeText ? (
              (() => {
                if (
                  safeText.includes("•") ||
                  safeText.includes("-") ||
                  safeText.includes("*")
                ) {
                  return <div className="whitespace-pre-line">{safeText}</div>;
                }

                const sentences = safeText
                  .split(/[.!?]\s+|\n+/)
                  .filter((s) => s.trim().length > 10);

                if (sentences.length > 1) {
                  return (
                    <ul className="list-disc list-inside space-y-2">
                      {sentences.map((sentence, index) => (
                        <li key={index} className="text-gray-700">
                          {sentence.trim()}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return <div className="whitespace-pre-line">{safeText}</div>;
              })()
            ) : (
              <p className="text-gray-400">No payment instructions available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// interface PaymentInstructionsSectionProps {
//   text?: string;
// }

// export default function PaymentInstructionsSection({ text }: PaymentInstructionsSectionProps) {
//   return (
//     <div className="p-6 relative min-h-[600px]">
//       <h2 className="text-lg text-gray-900 mb-6">
//         Payment Instructions
//       </h2>
//       <p className="text-gray-600 mb-6">
//         Payment instructions show how to send payments to this business
//       </p>

//       <div className="space-y-6">
//         <div>
//           <h3 className="text-gray-800 mb-3">Payment Instructions</h3>
//           <div className="text-sm text-gray-600 leading-relaxed">
//             {text? (
//               (() => {
//                 // Check if it's already formatted as a list or has bullet points
//                 if (text.includes('•') || text.includes('-') || text.includes('*')) {
//                   return <div className="whitespace-pre-line">{text}</div>;
//                 }
//                 // Split by common sentence endings and format as list
//                 const sentences = text
//                   .split(/[.!?]\s+|\n+/)
//                   .filter((s: string) => s.trim().length > 10); // Only meaningful sentences

//                 if (sentences.length > 1) {
//                   return (
//                     <ul className="list-disc list-inside space-y-2">
//                       {sentences.map((sentence: string, index: number) => (
//                         <li key={index} className="text-gray-700">
//                           {sentence.trim()}
//                         </li>
//                       ))}
//                     </ul>
//                   );
//                 }
//                 // Single paragraph - display as is
//                 return <div className="whitespace-pre-line">{text}</div>;
//               })()
//             ) : (
//               <p className="text-gray-400">No payment instructions available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
