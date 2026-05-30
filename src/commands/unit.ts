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
        console.log(formatOutput(result, !opts.raw));
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
  registerUnitConvert(unit, 'length', 'Length conversion (m, km, cm, mm, mi, yd, ft, in, nmi, etc.)', (api, num, unit) => api.length(num, unit));
  registerUnitConvert(unit, 'temperature', 'Temperature conversion (C, F, K, Ra)', (api, num, unit) => api.temperature(num, unit));
  registerUnitConvert(unit, 'storage', 'Storage conversion (bit, byte, kb, mb, gb, tb, pb, eb, zb, yb)', (api, num, unit) => api.storage(num, unit));
  registerUnitConvert(unit, 'power', 'Power conversion (W, kW, MW, PS, hp)', (api, num, unit) => api.power(num, unit));
  registerUnitConvert(unit, 'force', 'Force conversion (N, kN, kgf, dyn, lbf)', (api, num, unit) => api.force(num, unit));
  registerUnitConvert(unit, 'illuminance', 'Illuminance conversion (lx, phot, fc)', (api, num, unit) => api.illuminance(num, unit));
}
