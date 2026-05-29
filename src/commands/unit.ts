import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { UnitAPI } from '../api/unit';
import { formatOutput } from '../utils/output';

function registerUnitConvert(
  program: Command,
  name: string,
  desc: string,
  method: (api: UnitAPI, num: number, unit: string) => Promise<any>
): void {
  program
    .command(name)
    .description(desc)
    .requiredOption('--num <n>', 'Value to convert')
    .requiredOption('--unit <u>', 'Source unit')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new UnitAPI(client);
      try {
        const result = await method(api, Number(options.num), options.unit);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}

export function registerUnitCommands(program: Command): void {
  const unit = program.command('unit').description('Unit conversion operations');

  registerUnitConvert(unit, 'speed', 'Speed conversion (m/s, km/h, mph, kn, Ma, c)', (api, num, unit) => api.speed(num, unit));
  registerUnitConvert(unit, 'time', 'Time unit conversion (ns, μs, ms, s, min, h, d, w, month, year)', (api, num, unit) => api.timeUnit(num, unit));
  registerUnitConvert(unit, 'density', 'Density conversion (kg/m³, g/cm³, g/mL, lb/ft³)', (api, num, unit) => api.density(num, unit));
  registerUnitConvert(unit, 'frequency', 'Frequency conversion (Hz, kHz, MHz, GHz)', (api, num, unit) => api.frequency(num, unit));
  registerUnitConvert(unit, 'current', 'Current conversion (A, kA, mA, µA)', (api, num, unit) => api.current(num, unit));
  registerUnitConvert(unit, 'voltage', 'Voltage conversion (V, kV, mV, µV)', (api, num, unit) => api.voltage(num, unit));
  registerUnitConvert(unit, 'resistance', 'Resistance conversion (µΩ, Ω, kΩ, MΩ)', (api, num, unit) => api.resistance(num, unit));
}
