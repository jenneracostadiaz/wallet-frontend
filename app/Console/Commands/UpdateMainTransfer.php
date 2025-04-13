<?php

namespace App\Console\Commands;

use App\Models\Record;
use Illuminate\Console\Command;

class UpdateMainTransfer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'records:update-main-transfer';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set main_transfer to true for all records with type expense or income';

    /**
     * Execute the console command.
     */
    public function handle():void
    {
        $updated = Record::query()
            ->whereIn('type', ['expense', 'income'])
            ->update(['main_transfer' => true]);

        $this->info("Successfully updated {$updated} records.");

        // Handle transfer records
        $transferRecords = Record::query()
            ->where('type', 'transfer')
            ->orderBy('date')
            ->orderBy('time')
            ->get()
            ->groupBy(fn($record) => $record->date . ' ' . $record->time);

        foreach ($transferRecords as $group) {
            if ($group->count() === 2) {
                $group[0]->update(['main_transfer' => true]);
                $group[1]->update(['main_transfer' => false]);
            }
        }

        $this->info("Successfully updated transfer records.");
    }
}
