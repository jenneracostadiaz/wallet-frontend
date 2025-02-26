@if (Route::has('login'))
    <nav class="w-full flex gap-4 mb-4 justify-center">
        @auth
            <a
                href="{{ url('/dashboard') }}"
                class="border-b border-gray-400 px-12 py-2 text-sm ring-1 ring-transparent transition focus:outline-none text-white hover:text-white/80 focus-visible:ring-white"
            >
                Dashboard
            </a>
        @else
            <a
                href="{{ route('login') }}"
                class="border-b border-gray-400 px-12 py-2 text-sm ring-1 ring-transparent transition focus:outline-none text-white hover:text-white/80 focus-visible:ring-white"
            >
                Log in
            </a>

            @if (Route::has('register'))
                <a
                    href="{{ route('register') }}"
                    class="border-b border-gray-400 px-12 py-2 text-sm ring-1 ring-transparent transition focus:outline-none text-white hover:text-white/80 focus-visible:ring-white"
                >
                    Register
                </a>
            @endif
        @endauth
    </nav>
@endif
