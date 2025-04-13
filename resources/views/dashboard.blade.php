<x-app-layout>
    <livewire:widgets.accounts/>
    <livewire:widgets.balance/>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="col-span-1">
            <livewire:widgets.categories-report :type="'expense'"/>
        </div>
        <div class="col-span-1">
            <livewire:widgets.categories-report :type="'income'"/>
        </div>
    </div>
    <hr class="my-12 border-gray-700"/>
    <div class="grid lg:grid-cols-3 gap-4">
        <livewire:receivables.resumen/>
        <div class="col-span-2">
            <livewire:payments :showPaid="false"/>
        </div>
    </div>
    <hr class="my-12 border-gray-700"/>
    <livewire:records :perPage="5"/>
</x-app-layout>
