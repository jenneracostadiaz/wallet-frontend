@props(['title', 'message', 'link' => null])
<div class="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-600 rounded-lg">
    <h2 class="text-lg font-semibold text-gray-400">{{ $title }}</h2>
    @if($link)
        <a href="{{ $link }}" class="mt-4 text-sm text-gray-200 hover:underline">{{ $message }}</a>
    @else
        <p class="text-sm text-gray-400">{{ $message }}</p>
    @endif
</div>
