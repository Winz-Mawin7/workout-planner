import ReactMarkdown from 'react-markdown'

export const Markdown = ({ content }: { content: string }) => {
  return (
    <div className="rounded bg-slate-50 p-4">
      <ReactMarkdown className="flex flex-col gap-4">{content}</ReactMarkdown>
    </div>
  )
}
