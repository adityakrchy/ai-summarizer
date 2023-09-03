import { useState, useEffect } from "react"
import { icons } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article"


const Demo = () => {
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"))
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }

  }, [])
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [article, setarticle] = useState({
    url: "",
    summary: "",
  })

  const [allArticles, setAllArticles] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary }
      const updatedAllArticles = [newArticle, ...allArticles]
      setarticle(newArticle)
      setAllArticles(updatedAllArticles)
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles))
    }
  }

  // function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <section className="mt-16 w-full max-w-xl ">
      <div className="flex flex-col w-full gap-2">
        {/* input field */}
        <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <img src={icons.linkIcon} alt="link_icon" className="absolute left-0 my-2 ml-3 w-5" />
          <input type="url" placeholder="Enter a URL..." value={article.url} onChange={(e) => setarticle({
            ...article, url: e.target.value
          })}
            required className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0 peer" />
          <button className="hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700">↵</button>
        </form>

        {/* browse input history */}
        {/* <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => {
            <div key={`link-${index}`} onClick={() => setarticle(item)} className="p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer">
                <img src={icons.copy} alt="copy_icon" className="w-[40%] h-[40%] object-contain" />
              </div>
            </div>
          })}
        </div> */}

      </div>

      {/* display results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={icons.loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">That was not suppose to happen!.. <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : article.summary && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between"><h2 className="font-satoshi font-bold text-gray-600 text-xl">Article <span className="font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Summary</span></h2><span><img onClick={()=>{copyToClipboard(article.summary)}} src={icons.copy} className="w-4 h-4 hover:border-gray-700 hover:text-gray-700" alt="copy_btn" /></span></div>
            <div className="rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4">
              <p className="font-inter text-sm font-medium text-gray-700 text-justify">{article.summary}</p>
            </div>
          </div>
        )}
      </div>

    </section>
  )
}

export default Demo