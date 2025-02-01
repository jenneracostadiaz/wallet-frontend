<x-app-layout>
    <livewire:widgets.accounts/>
    <livewire:widgets.balance/>
    <hr class="my-12 border-gray-700"/>
    <div class="grid lg:grid-cols-3">
        <livewire:receivables.resumen/>
    </div>
    <hr class="my-12 border-gray-700"/>
    <livewire:records :perPage="5"/>
</x-app-layout>
