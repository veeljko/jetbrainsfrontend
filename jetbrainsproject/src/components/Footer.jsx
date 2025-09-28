export default function Footer() {
    return (
        <footer className="bg-[#112D4E] text-gray-300 py-5 px-5">
            <div className="max-w-7xl mx-auto ">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-7 lg:px-0 ">

                    <div>
                        <h2 className="text-xl font-bold text-white text-center sm:text-left">Survey Visualizer integration</h2>
                        <p className="text-sm mt-2 text-gray-100/80 text-center sm:text-left">
                            A simple visualization tool powered by the Open Trivia DB API.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-10">
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                                Resources
                            </h3>
                            <ul className="mt-2 space-y-1 text-sm text-gray-100/80">
                                <li><a href="https://opentdb.com" className="hover:text-white">Open Trivia DB</a></li>
                                <li><a href="https://opentdb.com/api_config.php" className="hover:text-white">Docs</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                                Contact
                            </h3>
                            <ul className="mt-2 space-y-1 text-sm">
                                <li><a href="mailto:vmladenovic1524rn@raf.rs" className="hover:text-white">Email</a></li>
                                <li><a href="https://github.com/veeljko" className="hover:text-white">GitHub</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-600 mt-4 pt-4 text-sm text-center text-gray-400">
                    © {new Date().getFullYear()} Veljko Mladenovic. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
