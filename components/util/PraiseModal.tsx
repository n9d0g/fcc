import React from 'react'

type ModalProps = {
  date: string
  title: string
  text: any
  topic: string
  scripture?: string
  objective?: string
  summary?: string
  speaker?: string
  messageTitle?: string
}

const PraiseModal = (props: ModalProps) => {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <>
      <button
        className="bg-blue p-6 rounded text-white"
        type="button"
        onClick={() => setShowModal(true)}>
        {props.title}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-w-screen-sm mx-auto">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-nonep">
                <div className="relative p-6 flex-auto">
                  <h4 className="font-bold">SPEAKER</h4>
                  <p className="mb-2 text-slate-500 leading-relaxed w-full whitespace-pre-line">
                    {props.speaker}
                  </p>
                  <h4 className="font-bold">MESSAGE TITLE</h4>
                  <p className="mb-2 text-slate-500 leading-relaxed w-full whitespace-pre-line">
                    {props.messageTitle}
                  </p>
                  <h4 className="font-bold">SUMMARY</h4>
                  <p className="mb-2 text-slate-500 leading-relaxed w-full whitespace-pre-line">
                    {props.text}
                  </p>
                  <h4 className="font-bold">OBJECTIVE</h4>
                  <p className="mb-2 text-slate-500 leading-relaxed w-full whitespace-pre-line">
                    {props.objective}
                  </p>
                  <h4 className="font-bold">SCRIPTURE</h4>
                  <p className="mb-2 text-slate-500 leading-relaxed w-full whitespace-pre-line">
                    {props.scripture}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default PraiseModal
